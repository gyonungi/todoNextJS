'use client'
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<div>
			{pages.map(page => (
				<button key={page.id} onClick={() => onPageChange(page)}>
					{page}
				</button>
			))}
		</div>
	)
}
export default Pagination
