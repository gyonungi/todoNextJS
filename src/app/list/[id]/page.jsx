'use client'
import styles from '../../page.module.scss'
export async function getData(id) {
	const res = await fetch(`https://taxivoshod.ru/testapi/?w=item&id=${id}`, {
		cache: 'no-store',
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}
const ListId = async ({ params, setModal }) => {
	const data = await getData(params.id)
	return (
		<>
			<div className={styles.modal} onClick={() => setModal(false)}>
				Закрыть
				<div className={styles.modal__content}>
					<h2>{data?.name}</h2>
					<p>{data?.text}</p>
				</div>
			</div>
		</>
	)
}

export default ListId
