using System;
using System.ComponentModel.DataAnnotations;

namespace GrimEntertainment.Web.Data.Models
{
    public class Game
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Publisher { get; set; }

        public string BannerUrl { get; set; }

        public string TrailerUrl { get; set; }

        public string Description { get; set; }

        public string DownloadLink { get; set; }

        public double Rating { get; set; }

        public User Creator { get; set; }
        public Guid CreatorId { get; set; }
    }
}
