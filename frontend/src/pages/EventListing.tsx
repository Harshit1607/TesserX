import { useState, useEffect, useRef, useCallback } from 'react';
import logo from '../assets/Logo.png'
import eventsData from '../data/Event.json'; 

interface Event {
  id: number;
  name: string;
  email : string;
  industry : string;
  website : string;
  logo : string;
  description: string;
  contact_person : object;
  category: string;
  evented_socieites : [];
  evented_events : [];
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
  // State for events data
  const [events, setevents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract categories from your data for the filter dropdown
  const categories = Array.from(new Set(eventsData.map(event => event.industry)));
  
  // Ref for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lasteventElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  

  const fetchevents = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    
    try {

      await new Promise(resolve => setTimeout(resolve, 300));
      
 
      let filteredResults = eventsData;
      
      if (searchTerm) {
        filteredResults = filteredResults.filter(event => 
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterCategory) {
        filteredResults = filteredResults.filter(event => 
          event.industry === filterCategory
        );
      }
      

      const startIndex = (pageNumber - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedResults = filteredResults.slice(startIndex, endIndex);
      

      setHasMore(endIndex < filteredResults.length);
      

      setevents(prev => {
        // For page 1, replace the entire list
        if (pageNumber === 1) {
          return paginatedResults;
        }
        // For subsequent pages, append
        return [...prev, ...paginatedResults];
      });
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // State to track when filters change
  const [filtersChanged, setFiltersChanged] = useState(false);
  
  // Initial data load and pagination
  useEffect(() => {
    if (!filtersChanged) {
      fetchevents(page);
    }
  }, [page, filtersChanged]);
  
  // Reset data and fetch when filters change
  useEffect(() => {
    if (filtersChanged) {
      setevents([]);
      setPage(1);
      setHasMore(true);
      fetchevents(1);
      setFiltersChanged(false);
    }
  }, [filtersChanged]);
  
  // Filter and search logic
  const filteredevents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterCategory || event.industry === filterCategory;
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Add small delay before triggering filter change to avoid excessive fetches
    setTimeout(() => {
      setFiltersChanged(true);
    }, 500);
  };
  
  // Handle filter selection
  const handleFilterSelect = (category: string) => {
    setFilterCategory(category === filterCategory ? '' : category);
    setShowFilters(false);
    setFiltersChanged(true);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilterCategory('');
    setSearchTerm('');
    setShowFilters(false);
    setFiltersChanged(true);
  };

  return (
    <div className="min-h-screen min-w-screen text-white p-15">
      <header className="flex justify-between items-center border-gray-800">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-[#1AD6B5] mr-3"></div>
          <h1  style={{fontFamily : 'Camerao'}}> Welcome, Meta </h1>
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
                      category === filterCategory ? 'bg-[#E785F2] text-white' : 'text-gray-200'
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
        {filteredevents.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-400">
            No events found. Try adjusting your filters.
          </div>
        )}
        
        {filteredevents.map((event, index) => {
  
          const isLastElement = index === filteredevents.length - 1;
          
          return (
            <div 
              key={event.id} 
              className="mb-4"
              ref={isLastElement && hasMore ? lasteventElementRef : null}
            >
              <div className="flex items-start py-4 my-6">
                <div className="w-20 h-20 bg-gray-300 mr-4 flex-shrink-0"><div>logo</div></div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">{event.name}</h2>
                    <span className="ml-2 px-2 py-1 bg-gray-800 text-xs rounded-full">
                      {event.industry}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{event.description}</p>
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
              {index < filteredevents.length - 1 && <hr className="border-gray-800" />}
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
              className="ml-2 text-[#E785F2] underline"
              onClick={() => fetchevents(page)}
            >
              Retry
            </button>
          </div>
        )}
  
        {!hasMore && !loading && filteredevents.length > 0 && (
          <div className="text-center py-4 text-gray-400">
            You've reached the end of the list.
          </div>
        )}
      </div>

     
      <div className="fixed bottom-0 left-0 right-0 flex w-screen bg-black justify-center">
        <div className="flex items-center space-x-4  px-6 py-3 rounded-full shadow-lg">
          <span className="text-2xl">events</span>
          <div className="bg-[#1AD6B5] p-4 rounded-full">
            <PlusIcon />
          </div>
          <span className="text-2xl">Message</span>
        </div>
      </div>
    </div>
  );
}