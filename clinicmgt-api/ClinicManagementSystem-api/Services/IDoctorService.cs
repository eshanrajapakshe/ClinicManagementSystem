using clinicmgt_api.Models;

namespace clinicmgt_api.Services
{
    public interface IDoctorService
    {
        Task<IEnumerable<Doctor>> GetDoctorsAsync();
        Task<Doctor> GetDoctorAsync(string id);
        Task<Doctor> AddDoctorAsync(Doctor doctor);
        Task<Doctor> UpdateDoctorAsync(string id, Doctor doctor);
        Task DeleteDoctorAsync(string id);
    }
}
