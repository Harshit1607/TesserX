import { useState, useEffect, useRef, useCallback } from 'react';
import logo from '../assets/Logo.png'
import Company from "../data/Company.json"
// Define types for our data
interface Sponsor {
  id: number;
  name: string;
  email : string;
  industry : string;
  website : string;
  logo : string;
  description: string;
  contact_person : object;
  category: string;
  sponsored_socieites : [];
  sponsored_events : [];
  verified: boolean;
  event_type: string;
  target_audience: string;
  budget : Int16Array;
  location : string;
  proposal: string;
}


const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function DigitalArtsSociety() {
  // State for sponsors data
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Technology', 'Art', 'Education', 'Entertainment', 'Business'];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastSponsorElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  // backend fetch the sponsors
  const fetchSponsors = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    
    try {

      await new Promise(resolve => setTimeout(resolve, 800));

      const allSponsors = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Sponsor ${i + 1}`,
        description: "Lorem ipsum dolor sit amet consectetur. Orci felis volutpat diam proin arcu. Viverra ac nibh maecenas mi ut sodales lacus Ut fringilla.",
        category: categories[Math.floor(Math.random() * categories.length)]
      }));
      

      let filteredResults = allSponsors;
      
      if (searchTerm) {
        filteredResults = filteredResults.filter(sponsor => 
          sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          sponsor.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterCategory) {
        filteredResults = filteredResults.filter(sponsor => 
          sponsor.category === filterCategory
        );
      }
      
  
      const startIndex = (pageNumber - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedResults = filteredResults.slice(startIndex, endIndex);

      setHasMore(endIndex < filteredResults.length);
    
      setSponsors(prev => {
        if (pageNumber === 1) {
          return paginatedResults;
        }

        return [...prev, ...paginatedResults];
      });
    } catch (err) {
      setError('Failed to fetch sponsors. Please try again later.');
      console.error('Error fetching sponsors:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const [filtersChanged, setFiltersChanged] = useState(false);
  
  useEffect(() => {
    if (!filtersChanged) {
      fetchSponsors(page);
    }
  }, [page, filtersChanged]);
  
  useEffect(() => {
    if (filtersChanged) {
      setSponsors([]);
      setPage(1);
      setHasMore(true);
      fetchSponsors(1);
      setFiltersChanged(false);
    }
  }, [filtersChanged]);
  
  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sponsor.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterCategory || sponsor.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    setTimeout(() => {
      setFiltersChanged(true);
    }, 500);
  };
  
  const handleFilterSelect = (category: string) => {
    setFilterCategory(category === filterCategory ? '' : category);
    setShowFilters(false);
    setFiltersChanged(true);
  };
  

  const resetFilters = () => {
    setFilterCategory('');
    setSearchTerm('');
    setShowFilters(false);
    setFiltersChanged(true);
  };

  return (
    <div className="min-h-screen min-w-screen bg-black text-white p-15">
      <header className="flex justify-between items-center border-gray-800">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-emerald-400 mr-3"></div>
          <h1  style={{fontFamily : 'Camerao'}}> Welcome, Digital Arts Society</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <img src={logo} alt="" className='h-15' />
        </div>
      </header>

      <div className="p-4 flex space-x-2">
        <div className="relative ">
          <button 
            className="flex items-center space-x-2 bg-[#2A2828] rounded-full h-8"
            onClick={() => setShowFilters(!showFilters)}
          >
            <MenuIcon />
            <span>Filter{filterCategory && `: ${filterCategory}`}</span>
          </button>
          
  
          {showFilters && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-[#2A2828] rounded-md shadow-lg z-10">
              <div className="p-2">
                <button 
                  className="w-full text-left  hover:bg-gray-700 rounded-md text-gray-200"
                  onClick={resetFilters}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    className={`w-full text-left p-2 hover:bg-gray-700 rounded-md ${
                      category === filterCategory ? 'bg-fuchsia-900 text-white' : 'text-gray-200'
                    }`}
                    onClick={() => handleFilterSelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center bg-[#2A2828] px-4 py-2 h-8 rounded-full ">
          <span className="mr-2 text-gray-400">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent outline-none w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="text-gray-400"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-24">
        {filteredSponsors.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-400">
            No sponsors found. Try adjusting your filters.
          </div>
        )}
        
        {filteredSponsors.map((sponsor, index) => {
  
          const isLastElement = index === filteredSponsors.length - 1;
          
          return (
            <div 
              key={sponsor.id} 
              className="mb-4"
              ref={isLastElement && hasMore ? lastSponsorElementRef : null}
            >
              <div className="flex items-start py-4 my-6">
                <div className="w-20 h-20 bg-gray-300 mr-4 flex-shrink-0"></div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">{sponsor.name}</h2>
                    <span className="ml-2 px-2 py-1 bg-gray-800 text-xs rounded-full">
                      {sponsor.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{sponsor.description}</p>
                  <button style={{textAlign: 'left' , padding: 0 , fontSize : '12px', justifyContent:'end'}} className="text-gray-400 mt-5 decoration-0 text-left">Know more</button>
                </div>
                <div className="flex flex-col items-end p-0">
                  <button className="bg-[#E785F2] text-black rounded-md">
                    View Proposal
                  </button>
                  <button className="flex items-center text-gray-300 underline">
                    Chat with us 
                    <span className="ml-2">
                      <MessageCircleIcon />
                    </span>
                  </button>
                </div>
              </div>
              {index < filteredSponsors.length - 1 && <hr className="border-gray-800" />}
            </div>
          );
        })}
        
     
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block w-8 h-8 border-4 border-gray-400 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-400">Loading more...</p>
          </div>
        )}
        
        
        {error && (
          <div className="text-center py-4 text-red-500">
            {error}
            <button 
              className="ml-2 text-fuchsia-500 underline"
              onClick={() => fetchSponsors(page)}
            >
              Retry
            </button>
          </div>
        )}
  
        {!hasMore && !loading && filteredSponsors.length > 0 && (
          <div className="text-center py-4 text-gray-400">
            You've reached the end of the list.
          </div>
        )}
      </div>

     
      <div className="fixed bottom-0 left-0 right-0 flex w-screen bg-black justify-center">
        <div className="flex items-center space-x-4  px-6 py-3 rounded-full shadow-lg">
          <span className="text-2xl">Sponsors</span>
          <div className="bg-[#1AD6B5] p-4 rounded-full">
            <PlusIcon />
          </div>
          <span className="text-2xl">Message</span>
        </div>
      </div>
    </div>
  );
}