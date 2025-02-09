import { ArrowRight, Mail, Newspaper, Sparkles, Tag } from "lucide-react";
import { FiRefreshCcw } from "react-icons/fi";


const HowItWorks = () => {
  const featuredCampaigns = [
    {
      title: "Clean Water Initiative",
      category: "Health",
      raised: 8500,
      goal: 10000,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Education for All",
      category: "Education",
      raised: 12000,
      goal: 15000,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Green Energy Project",
      category: "Environment",
      raised: 6000,
      goal: 20000,
      image: "/api/placeholder/400/300"
    }
  ];

  const categories = [
    { name: "Education", count: 45, icon: "🎓" },
    { name: "Healthcare", count: 32, icon: "🏥" },
    { name: "Environment", count: 28, icon: "🌱" },
    { name: "Technology", count: 24, icon: "💻" }
  ];

  const blogs = [
    {
      title: "Impact of Social Campaigns",
      excerpt: "How crowdfunding is changing lives...",
      date: "Jan 15, 2024",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Success Stories",
      excerpt: "Meet the people behind successful campaigns...",
      date: "Jan 12, 2024",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="space-y-20 py-10">
      {/* Top Rated Campaigns */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <FiRefreshCcw className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Top Rated Campaigns</h2>
          </div>
          <button className="text-primary hover:text-primary-focus transition-colors flex items-center space-x-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCampaigns.map((campaign, index) => (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                    {campaign.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {campaign.title}
                </h3>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Raised: ${campaign.raised}</span>
                    <span className="text-primary">Goal: ${campaign.goal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-8">
            <Tag className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Browse Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count} campaigns
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center space-x-2 mb-8">
          <Newspaper className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Latest Updates</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-sm text-primary mb-2">{blog.date}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
                <button className="text-primary hover:text-primary-focus transition-colors flex items-center space-x-2">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Stay Updated with Latest Campaigns
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to our newsletter and never miss opportunities to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary hover:bg-primary-focus text-white rounded-xl transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white space-y-6">
              <div className="inline-block p-2 bg-white/10 rounded-lg mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Special Campaign Promotion</h2>
              <p className="text-white/90">
                Launch your campaign today and get special benefits including featured placement and promotional support.
              </p>
              <button className="px-6 py-3 bg-white text-primary rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/500/300" 
                alt="Promotion"
                className="rounded-xl shadow-lg transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;