import { NavBar } from "../../common/NavBar";

type ProfilesPageProps = {
    isGuest?: boolean;
};

export const ProfilesPage: React.FC<ProfilesPageProps> = ({isGuest}) => {
    return(
        <>
            <NavBar />
        </>
    )
}