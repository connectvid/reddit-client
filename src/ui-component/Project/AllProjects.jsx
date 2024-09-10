/* eslint-disable jsx-a11y/alt-text */
// import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { setSingleProjectSelect } from 'features/project/projectActions';
import { useLocation, useNavigate } from 'react-router-dom';
import BRAC from 'views/BizReply/BRAC';

export default function ({ projectListWidth = '270px' }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        project: { projects, project }
    } = useSelector((state) => state);
    const options = projects?.map?.(({ brandName: label, _id }) => ({ label, _id }));

    return (
        <>
            {options?.length ? (
                <BRAC
                    {...{
                        title: 'Choose project',
                        placeholder: 'Select project',
                        options,
                        disableClearable: true,
                        defaultValue: { label: project?.brandName, _id: project?._id },
                        wrapperSx: {
                            width: projectListWidth
                        },
                        onChange: (_, data) => {
                            const id = data?._id;
                            if (id) {
                                setSingleProjectSelect(id)();
                                navigate(`${pathname}?dp=${id}`);
                            }
                            console.log(data);
                            return data;
                        }
                    }}
                />
            ) : (
                ''
            )}
        </>
    );
}
