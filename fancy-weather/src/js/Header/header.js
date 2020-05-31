import createControls from './Controls/Controls';
import createSearchForm from './SeachForm/SearchFrom';

export default function createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header__wrapper');
    const controls = createControls();
    const searchForm = createSearchForm();
    headerWrapper.append(controls, searchForm);
    header.append(headerWrapper);
    return header;
}