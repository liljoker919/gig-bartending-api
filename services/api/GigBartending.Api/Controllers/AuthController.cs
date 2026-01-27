using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GigBartending.Api.Models;
using GigBartending.Api.DTOs;

namespace GigBartending.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            Role = dto.Role,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PhoneNumber = dto.PhoneNumber,
            // NOTE: Setting EmailConfirmed = true for development/demo purposes
            // In production, implement email verification flow before setting this to true
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (result.Succeeded)
        {
            return Ok(new { message = "User created successfully", userId = user.Id });
        }

        return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

        if (result.Succeeded)
        {
            return Ok(new 
            { 
                message = "Login successful",
                userId = user.Id,
                email = user.Email,
                role = user.Role,
                firstName = user.FirstName,
                lastName = user.LastName
            });
        }

        return Unauthorized(new { message = "Invalid email or password" });
    }

    [HttpPost("verify-password")]
    public async Task<IActionResult> VerifyPassword([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var isValid = await _userManager.CheckPasswordAsync(user, dto.Password);

        return Ok(new 
        { 
            isValid = isValid,
            message = isValid ? "Password is correct" : "Password is incorrect"
        });
    }
}
