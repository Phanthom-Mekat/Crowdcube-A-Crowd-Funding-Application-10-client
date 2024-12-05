import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCampaign = () => {
    const { user } = useContext(AuthContext);
    const loadedCampaigns = useLoaderData();
    console.log(loadedCampaigns)
    const {_id,
        title,
        type,
        description,
        minDonation,
        deadline,
        image } = loadedCampaigns

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const type = form.type.value;
        const description = form.description.value;
        const minDonation = form.minDonation.value;
        const deadline = form.deadline.value;
        const image = form.image.value;

        const campaign = {
            title,
            type,
            description,
            minDonation,
            deadline,
            image
        };

        fetch(`http://localhost:5000/campaigns/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(campaign),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Campaign updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                
            }
        })
            }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                            Update Your Campaign {user?.displayName}
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
                                    defaultValue={title}
                                />
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
                                    defaultValue={type}
                                >
                                    <option value="">Select a type</option>
                                    <option value="personal">Personal Issue</option>
                                    <option value="startup">Startup</option>
                                    <option value="business">Business</option>
                                    <option value="creative">Creative Ideas</option>
                                </select>
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
                                    defaultValue={description}
                                ></textarea>
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
                                            defaultValue={minDonation}
                                        />
                                    </div>
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
                                        required
                                        defaultValue={deadline}
                                    />
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
                                    required
                                    defaultValue={image}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-[#FF7A00] btn w-full text-white py-2 px-4 rounded-md hover:bg-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00]"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateCampaign;