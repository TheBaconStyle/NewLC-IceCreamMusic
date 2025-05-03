import { TarifList } from '@/components/TarifCard/Tarif.list';
import TarifCardDetail from '@/components/TarifCard/TarifCardDetail/TarifCardDetail';
import TarifTable from '@/components/TarifCard/TarifTable/TarifTable';

export default async function DetailPlans({
	params,
}: {
	params: { tarif: string };
}) {
	const { tarif } = await params;
	const indxDetail = TarifList.findIndex((e) => e.linkDetail.includes(tarif));

	return (
		<div>
			<TarifCardDetail idxDetail={indxDetail} />
		</div>
	);
}
