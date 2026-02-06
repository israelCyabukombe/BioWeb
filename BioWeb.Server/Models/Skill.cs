using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BioWeb.Server.Models
{
    public class Skill
    {
        public int Id { get; set; }

        [ForeignKey(nameof(PersonalInfo))]
        public int PersonalInfoId {  get; set; }

        public PersonalInfo PersonalInfo { get; set; } = null!;

        [MaxLength(25)]
        public string SkillName { get; set; } = string.Empty;

        [ForeignKey(nameof(SkillLevel))]
        public int SkillLevelId { get; set; }
        public SkillLevel SkillLevel { get; set; } = null!;

        [MaxLength(20)]
        public string Category { get; set; } = string.Empty;
    }
}
