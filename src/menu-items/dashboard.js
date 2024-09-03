// third-party
// import { FormattedMessage } from 'react-intl';
// assets
import { LuSquareAsterisk } from 'react-icons/lu';
import { FaSquarePollHorizontal } from 'react-icons/fa6';
import { CiAt } from 'react-icons/ci';
import { BiSolidMessageRoundedEdit } from 'react-icons/bi';
// import pluralize from 'pluralize';
import { PROJECT_PATH, KEYWORD_PATH, MENTION_PATH, REPLY_PATH, PROMPT_PATH } from 'config';
import textCapitalize from 'utils/textCapitalize';
import { TbPrompt } from 'react-icons/tb';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: PROJECT_PATH.replace('/', ''),
            title: 'Projects',
            type: 'item',
            url: PROJECT_PATH,
            icon: FaSquarePollHorizontal,
            breadcrumbs: false
        },
        {
            id: KEYWORD_PATH.replace('/', ''),
            title: 'Keywords',
            type: 'item',
            url: KEYWORD_PATH,
            icon: LuSquareAsterisk,
            breadcrumbs: false
        },
        {
            id: MENTION_PATH.replace('/', ''),
            title: 'Mentions',
            type: 'item',
            url: MENTION_PATH,
            icon: CiAt,
            breadcrumbs: false
        },
        {
            id: PROMPT_PATH.replace('/', ''),
            title: textCapitalize(PROMPT_PATH.replace('/', '')),
            type: 'item',
            url: PROMPT_PATH,
            icon: TbPrompt,
            breadcrumbs: false
        },
        {
            id: REPLY_PATH.replace('/', ''),
            title: 'Replies',
            type: 'item',
            url: REPLY_PATH,
            icon: BiSolidMessageRoundedEdit,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
