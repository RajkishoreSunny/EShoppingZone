using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceAPI.Models;

public partial class Review
{
    [Key]
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int ReviewId { get; set; }

    public int ProductId { get; set; }

    public string Description { get; set; } = null!;

    public int? Rating { get; set; }

    public byte[]? Image { get; set; }
}
