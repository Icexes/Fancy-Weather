import translates from '../../DataFiles/Translates/Translates';

export default function createSearchForm() {
    const searchForm = document.createElement('form');
    searchForm.classList.add('search-form');
    const searchInput = document.createElement('input');
    searchInput.classList.add('search-form__search-input');
    searchInput.placeholder = translates.placeholder[localStorage.getItem('lang')];
    const searchButton = document.createElement('button');
    searchButton.classList.add('search-form__sumbit-btn');
    searchButton.type = 'submit';
    searchButton.textContent = 'Search';
    const voiceButton = document.createElement('button');
    voiceButton.type = 'button';
    voiceButton.classList.add('search-form__voice-btn');
    voiceButton.innerHTML = `<svg class = 'mic' version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" width="20px" height = "20px" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 435.2 435.2" style="enable-background:new 0 0 435.2 435.2;" xml:space="preserve">
   <g>
       <path d="M356.864,224.768c0-8.704-6.656-15.36-15.36-15.36s-15.36,6.656-15.36,15.36c0,59.904-48.64,108.544-108.544,108.544
           c-59.904,0-108.544-48.64-108.544-108.544c0-8.704-6.656-15.36-15.36-15.36c-8.704,0-15.36,6.656-15.36,15.36
           c0,71.168,53.248,131.072,123.904,138.752v40.96h-55.808c-8.704,0-15.36,6.656-15.36,15.36s6.656,15.36,15.36,15.36h142.336
           c8.704,0,15.36-6.656,15.36-15.36s-6.656-15.36-15.36-15.36H232.96v-40.96C303.616,355.84,356.864,295.936,356.864,224.768z"/>
   </g>
   <g>
       <path d="M217.6,0c-47.104,0-85.504,38.4-85.504,85.504v138.752c0,47.616,38.4,85.504,85.504,86.016
          c47.104,0,85.504-38.4,85.504-85.504V85.504C303.104,38.4,264.704,0,217.6,0z"/>
</g>
</svg>`
    searchForm.append(searchInput, voiceButton, searchButton);
    return searchForm;
}