'use client'

import Pagination from '@/components/Pagin/Pagination'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '../../page.module.scss'
export async function getData(id) {
	const res = await fetch(` https://taxivoshod.ru/testapi/?w=list&page=${id}`, {
		cache: 'no-store',
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}
const PageId = ({ params }) => {
	const router = useRouter()
	const [data, setData] = useState([])
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [modalData, setModalData] = useState(false)
	const openModal = async itemId => {
		const res = await fetch(
			`https://taxivoshod.ru/testapi/?w=item&id=${itemId}`
		)
		const itemData = await res.json()
		setModalData(itemData)
		const newURL = `/list/${itemId}`
		window.history.pushState({}, '', newURL)
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedData = await getData(params.id)
				setData(fetchedData.items)
				setTotalPages(fetchedData.pages)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [params.id])
	const onCloseModal = () => {
		setModalData(!open)
		window.history.pushState({}, '', `/pages/${params.id}`)
	}
	const onPageChange = newPage => {
		setCurrentPage(newPage)
		router.push(`/pages/${newPage}`)
	}

	return (
		<div className={styles.container}>
			{modalData && (
				<div className={styles.modal} onClick={onCloseModal}>
					Закрыть
					<div className={styles.modal__content}>
						<h2>{modalData.name}</h2>
						<p>{modalData.text}</p>
					</div>
				</div>
			)}
			{Array.isArray(data) &&
				data.map(item => (
					<div key={item.id} onClick={() => openModal(item.id)}>
						{item.name}
					</div>
				))}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={onPageChange}
			/>
		</div>
	)
}

export default PageId
