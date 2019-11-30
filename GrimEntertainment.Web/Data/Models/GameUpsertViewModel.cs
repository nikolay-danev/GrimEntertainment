using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace GrimEntertainment.Web.Data.Models
{
    public class GameUpsertViewModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Publisher { get; set; }

        public IFormFile BannerUrl { get; set; }

        public string TrailerUrl { get; set; }

        public string Description { get; set; }

        public string DownloadLink { get; set; }

        public double Rating { get; set; }
    }
}
