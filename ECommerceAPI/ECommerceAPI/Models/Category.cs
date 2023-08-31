using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models;

public partial class Category
{
    [Key]
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public byte[] CategoryImg { get; set; } = null!;

    public string Subcategory { get; set; } = null!;

    public List<Product> Products { get; set; }
}
