using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models;

public partial class Admin
{
    [Key]
    public int AdminId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public byte[]? Image { get; set; }

    public string? Gender { get; set; }

    public DateTime? DateOfBirth { get; set; }
}
