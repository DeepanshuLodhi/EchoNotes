// import { useState, useEffect } from 'react';
// import Layout from '@/components/Layout';
// import NoteCard from '@/components/NoteCard';
// import AudioRecorder from '@/components/AudioRecorder';
// import { Note } from '@/types';
// import axios, { AxiosError } from 'axios';
// import { toast } from 'react-hot-toast';

// // Define interface for error response
// interface ErrorResponse {
//   message: string;
// }

// export default function Home() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [newNoteTitle, setNewNoteTitle] = useState('');
//   const [newNoteContent, setNewNoteContent] = useState('');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get<Note[]>('/api/notes', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotes(response.data);
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponse>;
//       toast.error(error.response?.data?.message || 'Failed to fetch notes');
//     }
//   };

//   const handleCreateNote = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         '/api/notes',
//         {
//           title: newNoteTitle,
//           content: newNoteContent,
//           type: 'text',
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setNewNoteTitle('');
//       setNewNoteContent('');
//       fetchNotes();
//       toast.success('Note created successfully');
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponse>;
//       toast.error(error.response?.data?.message || 'Failed to create note');
//     }
//   };

//   const handleDeleteNote = async (id: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`/api/notes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchNotes();
//       toast.success('Note deleted successfully');
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponse>;
//       toast.error(error.response?.data?.message || 'Failed to delete note');
//     }
//   };

//   const handleUpdateNote = async (id: string, data: Partial<Note>) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`/api/notes/${id}`, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchNotes();
//       toast.success('Note updated successfully');
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponse>;
//       toast.error(error.response?.data?.message || 'Failed to update note');
//     }
//   };

//   const handleTranscription = async (text: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         '/api/notes',
//         {
//           title: `Audio Note ${new Date().toLocaleString()}`,
//           content: text,
//           type: 'audio',
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchNotes();
//       toast.success('Audio note created successfully');
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponse>;
//       toast.error(error.response?.data?.message || 'Failed to create audio note');
//     }
//   };



//   const filteredNotes = notes
//     .filter(
//       (note) =>
//         note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         note.content.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       const dateA = new Date(a.createdAt).getTime();
//       const dateB = new Date(b.createdAt).getTime();
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* Search and Sort */}
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             placeholder="Search notes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
//             className="p-2 border rounded"
//           >
//             <option value="desc">Newest First</option>
//             <option value="asc">Oldest First</option>
//           </select>
//         </div>

//         {/* Create Note */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <input
//             type="text"
//             placeholder="Note title"
//             value={newNoteTitle}
//             onChange={(e) => setNewNoteTitle(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <textarea
//             placeholder="Note content"
//             value={newNoteContent}
//             onChange={(e) => setNewNoteContent(e.target.value)}
//             className="w-full p-2 mb-2 border rounded h-24"
//           />
//           <div className="flex justify-between">
//             <button
//               onClick={handleCreateNote}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Create Note
//             </button>
//             <AudioRecorder onTranscription={handleTranscription} />
//           </div>
//         </div>

//         {/* Notes Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredNotes.map((note) => (
//             <NoteCard
//               key={note._id}
//               note={note}
//               onDelete={handleDeleteNote}
//               onUpdate={handleUpdateNote}
//             />
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }


import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import NoteCard from '@/components/NoteCard';
import AudioRecorder from '@/components/AudioRecorder';
import { Note } from '@/types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// Define interface for error response
interface ErrorResponse {
  message: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchResults, setSearchResults] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  // Effect for handling real-time search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(notes);
    } else {
      const results = notes.filter((note) => {
        const searchTerm = searchQuery.toLowerCase();
        const titleMatch = note.title.toLowerCase().includes(searchTerm);
        const contentMatch = note.content.toLowerCase().includes(searchTerm);
        return titleMatch || contentMatch;
      });
      setSearchResults(results);
    }
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Note[]>('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
      setSearchResults(response.data); // Initialize search results with all notes
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Failed to fetch notes');
    }
  };

  const handleCreateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/notes',
        {
          title: newNoteTitle,
          content: newNoteContent,
          type: 'text',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewNoteTitle('');
      setNewNoteContent('');
      fetchNotes();
      toast.success('Note created successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Failed to create note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
      toast.success('Note deleted successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Failed to delete note');
    }
  };

  const handleUpdateNote = async (id: string, data: Partial<Note>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/notes/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
      toast.success('Note updated successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Failed to update note');
    }
  };

  const handleTranscription = async (text: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/notes',
        {
          title: `Audio Note ${new Date().toLocaleString()}`,
          content: text,
          type: 'audio',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotes();
      toast.success('Audio note created successfully');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Failed to create audio note');
    }
  };

  const displayedNotes = searchResults.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Sort */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search in titles and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 border rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Search Results Count */}
        {searchQuery.trim() !== '' && (
          <div className="text-sm text-gray-600">
            Found {searchResults.length} {searchResults.length === 1 ? 'note' : 'notes'} matching {searchQuery}
          </div>
        )}

        {/* Create Note */}
        <div className="bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Note title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Note content"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            className="w-full p-2 mb-2 border rounded h-24"
          />
          <div className="flex justify-between">
            <button
              onClick={handleCreateNote}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Note
            </button>
            <AudioRecorder onTranscription={handleTranscription} />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleUpdateNote}
            />
          ))}
        </div>

        {/* No Results Message */}
        {displayedNotes.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            {searchQuery.trim() !== '' 
              ? 'No notes found matching your search'
              : 'No notes yet. Create your first note!'}
          </div>
        )}
      </div>
    </Layout>
  );
}