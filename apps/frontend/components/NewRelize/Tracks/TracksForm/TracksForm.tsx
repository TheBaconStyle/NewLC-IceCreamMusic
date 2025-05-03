import AdditionParametersTrackData from './AdditionParametersTrackData/AdditionParametersTrackData';
import CopyRightTrackData from './CopyRightTrackData/CopyRightTrackData';
import IdentifyTrackData from './IdentifyTrackData/IdentifyTrackData';
import MainTracksData from './MainTracksData/MainTracksData';
import PersonsAndRolesTrack from './PersonsAndRolesTrack/PersonsAndRolesTrack';
import TypesOfUses from './TypesOfUses/TypesOfUses';
import VersionsTrackData from './VersionsTrackData/VersionsTrackData';

export default function TracksForm({ trackIndex }: { trackIndex: number }) {
	return (
		<>
			<div className='flex flex-col gap-5 col-span-3 w-full '>
				<div id='mainData'>
					<MainTracksData trackIndex={trackIndex} />
				</div>
				<div id='identify'>
					<IdentifyTrackData trackIndex={trackIndex} />
				</div>
				<div id='personsAndRoles'>
					<PersonsAndRolesTrack trackIndex={trackIndex} />
				</div>
				<CopyRightTrackData trackIndex={trackIndex} />
				<AdditionParametersTrackData trackIndex={trackIndex} />
				<VersionsTrackData trackIndex={trackIndex} />
				<TypesOfUses trackIndex={trackIndex} />
			</div>
		</>
	);
}
