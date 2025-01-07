import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { PlusCircle, DollarSign, Calendar, Image, FileText, UserCircle, Mail, Tag } from 'lucide-react';

const UpdateCampaign = () => {
    const { user } = useContext(AuthContext);
    const loadedCampaigns = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {
        _id,
        title,
        type,
        description,
        minDonation,
        deadline,
        image
    } = loadedCampaigns;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const campaign = {
            title: form.title.value,
            type: form.type.value,
            description: form.description.value,
            minDonation: form.minDonation.value,
            deadline: form.deadline.value,
            image: form.image.value
        };

        try {
            const response = await fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/${_id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(campaign),
            });
            const data = await response.json();
            
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Campaign updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update campaign',
                icon: 'error',
                confirmButtonText: 'Retry'
            });
        }
        setIsSubmitting(false);
    };

    const InputWrapper = ({ children }) => (
        <div className="relative">
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20  px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="mb-8 text-center">
                            <PlusCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                Update Your Campaign
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Modify your campaign details below
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
                                <InputWrapper>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>Campaign Title</span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={title}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                    />
                                </InputWrapper>

                                <InputWrapper>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            <span>Campaign Type</span>
                                        </div>
                                    </label>
                                    <select
                                        name="type"
                                        defaultValue={type}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="">Select campaign type</option>
                                        <option value="personal">Personal Issue</option>
                                        <option value="startup">Startup</option>
                                        <option value="business">Business</option>
                                        <option value="creative">Creative Ideas</option>
                                    </select>
                                </InputWrapper>

                                <InputWrapper>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>Description</span>
                                        </div>
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        defaultValue={description}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                    />
                                </InputWrapper>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <InputWrapper>
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
                                                defaultValue={minDonation}
                                                className="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                    </InputWrapper>

                                    <InputWrapper>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Campaign Deadline</span>
                                            </div>
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            defaultValue={deadline}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                        />
                                    </InputWrapper>
                                </div>

                                <InputWrapper>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Image className="w-4 h-4" />
                                            <span>Campaign Image URL</span>
                                        </div>
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        defaultValue={image}
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
                                            Updating Campaign...
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle className="w-5 h-5" />
                                            Update Campaign
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

export default UpdateCampaign;