using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models;

public partial class WishList
{
    [Key]
    public int WishListId { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public decimal TotalPrice { get; set; }
}
