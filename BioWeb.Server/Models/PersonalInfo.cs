using System.ComponentModel.DataAnnotations;

namespace BioWeb.Server.Models
{
    public class PersonalInfo
    {
        public int Id {  get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(255)]
        public string ProfilePhotoUrl { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string SummaryText { get; set; } = string.Empty;


        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    }
}
