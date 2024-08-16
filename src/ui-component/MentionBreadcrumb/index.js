/* eslint-disable jsx-a11y/alt-text */
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
import PostFilter from './PostFilter';

export default function MentionBreadcrumb({ setSelectedKeyword, loading }) {
    // { handleModal }
    // const { search } = useLocation();
    // const navigate = useNavigate();
    return (
        <Breadcrumb title="Keyword">
            <AllProjects />
            <PostFilter {...{ setSelectedKeyword, loading }} />
        </Breadcrumb>
    );
}
