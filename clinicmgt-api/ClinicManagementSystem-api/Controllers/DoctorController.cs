using clinicmgt_api.Models;
using Microsoft.AspNetCore.Mvc;
using clinicmgt_api.Services;
using Microsoft.Azure.Cosmos;

namespace clinicmgt_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly DoctorService _doctorService;

        public DoctorsController(DoctorService cosmosDbService)
        {
            _doctorService = cosmosDbService;
        }


        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            var doctors = await _doctorService.GetDoctorsAsync();
            return Ok(doctors);
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(string id)
        {
            var doctor = await _doctorService.GetDoctorAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        // POST: api/Doctors
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(DoctorDto doctorDto)
        {
            var doctor = new Doctor
            {
                FirstName = doctorDto.FirstName,
                MiddleName = doctorDto.MiddleName,
                LastName = doctorDto.LastName,
                Email = doctorDto.Email,
                PhoneNumber = doctorDto.PhoneNumber,
                Gender = doctorDto.Gender,
                DateOfBirth = doctorDto.DateOfBirth,
                LicenseNumber = doctorDto.LicenseNumber,
                Specialty = doctorDto.Specialty,
                YearsOfExperience = doctorDto.YearsOfExperience,
                Degree = doctorDto.Degree,
                Institution = doctorDto.Institution,
                GraduationYear = doctorDto.GraduationYear,
                Languages = doctorDto.Languages,
                ProfilePictureUrl = doctorDto.ProfilePictureUrl,
                WorkingHours = doctorDto.WorkingHours
            };

            var addedDoctor = await _doctorService.AddDoctorAsync(doctor);

            return CreatedAtAction(nameof(GetDoctor), new { id = addedDoctor.Id }, addedDoctor);
        }

        // PUT: api/Doctors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(string id, DoctorDto doctorDto)
        {
            var doctor = await _doctorService.GetDoctorAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            doctor.FirstName = doctorDto.FirstName;
            doctor.MiddleName = doctorDto.MiddleName;
            doctor.LastName = doctorDto.LastName;
            doctor.Email = doctorDto.Email;
            doctor.PhoneNumber = doctorDto.PhoneNumber;
            doctor.Gender = doctorDto.Gender;
            doctor.DateOfBirth = doctorDto.DateOfBirth;
            doctor.LicenseNumber = doctorDto.LicenseNumber;
            doctor.Specialty = doctorDto.Specialty;
            doctor.YearsOfExperience = doctorDto.YearsOfExperience;
            doctor.Degree = doctorDto.Degree;
            doctor.Institution = doctorDto.Institution;
            doctor.GraduationYear = doctorDto.GraduationYear;
            doctor.Languages = doctorDto.Languages;
            doctor.ProfilePictureUrl = doctorDto.ProfilePictureUrl;
            doctor.WorkingHours = doctorDto.WorkingHours;

            await _doctorService.UpdateDoctorAsync(id, doctor);

            return NoContent();
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(string id)
        {
            var doctor = await _doctorService.GetDoctorAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            await _doctorService.DeleteDoctorAsync(id);

            return NoContent();
        }
    }
}
