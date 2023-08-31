using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models;

public partial class Product
{
    [Key]
    public int ProductId { get; set; }

    public int CategoryId { get; set; }

    public byte[] Image { get; set; } = null!;

    public string? ProductName { get; set; }

    public decimal? ProductPrice { get; set; }

    public string? Description { get; set; }

    public int? Rating { get; set; }

    public string? Specification { get; set; }

    public int ReviewId { get; set; }
    public Category? Category { get; set; }
}
