

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import { fetchNotes } from '../../services/noteService'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'

import css from './App.module.css'
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  })
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => { setSearchQuery(newSearchQuery) }, 300);


  useEffect(() => {
    if (isSuccess && (data.notes.length === 0)) {
      toast.error("No notes found for your request.");
    }
  }, [isSuccess, data])

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
          {isSuccess && totalPages > 1 && <Pagination page={currentPage} onChange={setCurrentPage} total_page={totalPages} />}
          <button className={css.button} onClick={openModal}>Create note +</button>
          {isModalOpen && <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>}
        </header>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>

    </>
  )
}

export default App
