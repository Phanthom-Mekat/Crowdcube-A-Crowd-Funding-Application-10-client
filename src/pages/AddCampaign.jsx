import { useContext, useState } from 'react';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../provider/AuthProvider';

const AddNewCampaign = () => {
  const {user} = useContext(AuthContext);
  const [errors, setErrors] = useState({});


  const validateForm = (formData) => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.type) errors.type = "Type is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.minDonation) errors.minDonation = "Minimum donation is required";
    if (formData.minDonation <= 0) errors.minDonation = "Minimum donation must be greater than 0";
    if (!formData.deadline) errors.deadline = "Deadline is required";
    if (!formData.image) errors.image = "Image URL is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      userName: user?.displayName,
      userEmail: user?.email,
      title: e.target.title.value,
      type: e.target.type.value,
      description: e.target.description.value,
      minDonation: parseFloat(e.target.minDonation.value),
      deadline: e.target.deadline.value,
      image: e.target.image.value,

    };

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      fetch('http://localhost:5000/campaigns', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            e.target.reset();
            Swal.fire({
              title: 'Success!',
              text: 'Campaign added successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add the campaign',
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to connect to the server',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        });
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
              Create a New Campaign
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={user?.displayName}
                    readOnly
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                    User Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={user?.email}
                    readOnly
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Campaign Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  placeholder="Enter campaign title"
                  required
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Campaign Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="personal">Personal Issue</option>
                  <option value="startup">Startup</option>
                  <option value="business">Business</option>
                  <option value="creative">Creative Ideas</option>
                </select>
                {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  placeholder="Describe your campaign"
                  required
                ></textarea>
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="minDonation" className="block text-sm font-medium text-gray-700">
                    Minimum Donation Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="minDonation"
                      name="minDonation"
                      className="mt-1 block w-full pl-7 pr-12 border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  {errors.minDonation && <p className="mt-2 text-sm text-red-600">{errors.minDonation}</p>}
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  />
                  {errors.deadline && <p className="mt-2 text-sm text-red-600">{errors.deadline}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF7A00] focus:border-[#FF7A00] sm:text-sm"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-4 bg-[#FF7A00] btn w-full text-white py-2 px-4 rounded-md hover:bg-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00]"
                >
                  Add Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCampaign;

