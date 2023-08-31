using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models;

public partial class Feedback
{
    [Key]
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public string Description { get; set; } = null!;

}
