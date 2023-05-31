using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace clinicmgt_api.Models
{
    public class Doctor
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string MiddleName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        public string Gender { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [Required]
        public string Specialty { get; set; }

        public int YearsOfExperience { get; set; }

        public string Degree { get; set; }

        public string Institution { get; set; }

        public int GraduationYear { get; set; }

        public string[] Languages { get; set; }

        public string ProfilePictureUrl { get; set; }

        public string WorkingHours { get; set; }
    }
}
