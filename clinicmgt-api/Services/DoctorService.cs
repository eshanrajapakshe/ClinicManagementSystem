using clinicmgt_api.Models;
using Microsoft.Azure.Cosmos;

namespace clinicmgt_api.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly Container _container;

        public DoctorService(CosmosClient cosmosClient, string databaseName, string containerName)
        {
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<Doctor>> GetDoctorsAsync()
        {
            var query = _container.GetItemQueryIterator<Doctor>();
            var doctors = new List<Doctor>();

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                doctors.AddRange(response.ToList());
            }

            return doctors;
        }

        public async Task<Doctor> GetDoctorAsync(string id)
        {
            try
            {
                ItemResponse<Doctor> response = await _container.ReadItemAsync<Doctor>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<Doctor> AddDoctorAsync(Doctor doctor)
        {
            doctor.Id = Guid.NewGuid().ToString();
            ItemResponse<Doctor> response = await _container.CreateItemAsync(doctor, new PartitionKey(doctor.Id));
            return response.Resource;
        }

        public async Task<Doctor> UpdateDoctorAsync(string id, Doctor doctor)
        {
            ItemResponse<Doctor> response = await _container.UpsertItemAsync(doctor, new PartitionKey(id));
            return response.Resource;
        }

        public async Task DeleteDoctorAsync(string id)
        {
            await _container.DeleteItemAsync<Doctor>(id, new PartitionKey(id));
        }

        internal object InitializeDatabaseAsync()
        {
            throw new NotImplementedException();
        }

        internal object InitializeContainerAsync()
        {
            throw new NotImplementedException();
        }
    }
}
