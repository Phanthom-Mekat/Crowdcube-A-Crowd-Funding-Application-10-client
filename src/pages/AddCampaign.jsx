import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { PlusCircle, DollarSign, Calendar, Image, FileText, UserCircle, Mail, Tag } from 'lucide-react';

const AddNewCampaign = () => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      try {
        const response = await fetch('https://batch-10-assignment-10-server.vercel.app/campaigns', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (data.insertedId) {
          e.target.reset();
          Swal.fire({
            title: 'Success!',
            text: 'Campaign added successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to connect to the server',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    }
    setIsSubmitting(false);
  };

  const InputWrapper = ({ children, error }) => (
    <div className="relative">
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8 text-center">
              <PlusCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Create a New Campaign
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Fill in the details below to start your fundraising journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* User Info Section */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputWrapper>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-4 h-4" />
                      <span>User Name</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  />
                </InputWrapper>

                <InputWrapper>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  />
                </InputWrapper>
              </div>

              {/* Campaign Details */}
              <div className="space-y-6">
                <InputWrapper error={errors.title}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Campaign Title</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter a compelling title"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  />
                </InputWrapper>

                <InputWrapper error={errors.type}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Campaign Type</span>
                    </div>
                  </label>
                  <select
                    name="type"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select campaign type</option>
                    <option value="personal">Personal Issue</option>
                    <option value="startup">Startup</option>
                    <option value="business">Business</option>
                    <option value="creative">Creative Ideas</option>
                  </select>
                </InputWrapper>

                <InputWrapper error={errors.description}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Description</span>
                    </div>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Tell your story and explain your campaign's purpose..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  />
                </InputWrapper>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputWrapper error={errors.minDonation}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Minimum Donation</span>
                      </div>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">$</span>
                      </div>
                      <input
                        type="number"
                        name="minDonation"
                        placeholder="0.00"
                        className="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </InputWrapper>

                  <InputWrapper error={errors.deadline}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Campaign Deadline</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                    />
                  </InputWrapper>
                </div>

                <InputWrapper error={errors.image}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      <span>Campaign Image URL</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                  />
                </InputWrapper>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5" />
                      Create Campaign
                    </>
                  )}
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