using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceAPI.Models;

public partial class Cart
{
    [Key]
    public int CartId { get; set; }

    public int UserId { get; set; }

    [Column(TypeName = "decimal(12, 2)")]
    public decimal TotalPrice { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

}
