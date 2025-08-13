(function () {
  'use strict';

  /**
   * Types (JSDoc)
   * @typedef {{ code: string, name: string, countries: Country[] }} Continent
   * @typedef {{ code: string, name: string, states?: State[] }} Country
   * @typedef {{ code: string, name: string, cities?: string[] }} State
   */

  /** @type {HTMLElement} */
  const continentList = document.getElementById('continent-list');
  /** @type {HTMLElement} */
  const countryList = document.getElementById('country-list');
  /** @type {HTMLElement} */
  const stateList = document.getElementById('state-list');
  /** @type {HTMLElement} */
  const cityList = document.getElementById('city-list');

  /** @type {HTMLInputElement} */
  const continentSearch = document.getElementById('continent-search');
  /** @type {HTMLInputElement} */
  const countrySearch = document.getElementById('country-search');
  /** @type {HTMLInputElement} */
  const stateSearch = document.getElementById('state-search');
  /** @type {HTMLInputElement} */
  const citySearch = document.getElementById('city-search');

  /** @type {HTMLInputElement} */
  const countryOnlyToggle = document.getElementById('country-only-toggle');

  /** @type {HTMLElement} */
  const selectionSummary = document.getElementById('selection-summary');
  /** @type {HTMLElement} */
  const selectionOutput = document.getElementById('selection-output');

  /** @type {HTMLButtonElement} */
  const clearBtn = document.getElementById('clear-selection');
  /** @type {HTMLButtonElement} */
  const confirmBtn = document.getElementById('confirm-selection');

  /**
   * App state
   */
  const state = {
    filteredContinents: WORLD_DATA,
    filteredCountries: [],
    filteredStates: [],
    filteredCities: [],

    selectedContinent: null,
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,

    countryOnly: false,
  };

  function normalize(text) {
    return (text || '').toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function createListItem({ id, label, badgeText, selected, onClick }) {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.tabIndex = 0;
    if (id) li.dataset.id = id;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', selected ? 'true' : 'false');

    const span = document.createElement('span');
    span.textContent = label;
    li.appendChild(span);

    if (badgeText) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = badgeText;
      li.appendChild(badge);
    }

    li.addEventListener('click', onClick);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    });

    return li;
  }

  function clearElementChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function updateSummary() {
    const parts = [];
    if (state.selectedContinent) parts.push(state.selectedContinent.name);
    if (state.selectedCountry) parts.push(state.selectedCountry.name);
    if (!state.countryOnly && state.selectedState) parts.push(state.selectedState.name);
    if (!state.countryOnly && state.selectedCity) parts.push(state.selectedCity);

    selectionSummary.textContent = parts.length ? `Selected: ${parts.join(' • ')}` : 'No selection yet';

    const output = {
      continent: state.selectedContinent ? { code: state.selectedContinent.code, name: state.selectedContinent.name } : null,
      country: state.selectedCountry ? { code: state.selectedCountry.code, name: state.selectedCountry.name } : null,
      state: state.countryOnly ? null : (state.selectedState ? { code: state.selectedState.code, name: state.selectedState.name } : null),
      city: state.countryOnly ? null : (state.selectedCity || null),
      countryOnly: state.countryOnly,
    };

    selectionOutput.textContent = JSON.stringify(output, null, 2);
  }

  function resetLowerLevels(fromLevel) {
    switch (fromLevel) {
      case 'continent':
        state.selectedCountry = null;
        state.selectedState = null;
        state.selectedCity = null;
        state.filteredCountries = [];
        state.filteredStates = [];
        state.filteredCities = [];
        countrySearch.value = '';
        stateSearch.value = '';
        citySearch.value = '';
        break;
      case 'country':
        state.selectedState = null;
        state.selectedCity = null;
        state.filteredStates = [];
        state.filteredCities = [];
        stateSearch.value = '';
        citySearch.value = '';
        break;
      case 'state':
        state.selectedCity = null;
        state.filteredCities = [];
        citySearch.value = '';
        break;
    }
  }

  // renderContinents defined below (single source of truth)
  function renderContinents() {
    clearElementChildren(continentList);

    state.filteredContinents.forEach((ct) => {
      const item = createListItem({
        id: ct.code,
        label: ct.name,
        badgeText: `${ct.countries.length} countries`,
        selected: state.selectedContinent && state.selectedContinent.code === ct.code,
        onClick: () => {
          state.selectedContinent = ct;
          resetLowerLevels('continent');
          state.filteredCountries = ct.countries;
          renderAll();
        },
      });
      continentList.appendChild(item);
    });
  }

  function renderCountries() {
    clearElementChildren(countryList);
    const countries = state.selectedContinent ? state.filteredCountries : [];
    countries.forEach((co) => {
      const hasStates = Array.isArray(co.states) && co.states.length > 0;
      const item = createListItem({
        id: co.code,
        label: co.name,
        badgeText: hasStates ? `${co.states.length} states` : 'no states',
        selected: state.selectedCountry && state.selectedCountry.code === co.code,
        onClick: () => {
          state.selectedCountry = co;
          resetLowerLevels('country');
          if (hasStates) {
            state.filteredStates = co.states;
          } else {
            state.filteredStates = [];
          }
          renderAll();
        },
      });
      countryList.appendChild(item);
    });
  }

  function renderStates() {
    clearElementChildren(stateList);
    const states = state.countryOnly ? [] : (state.selectedCountry ? state.filteredStates : []);

    states.forEach((st) => {
      const item = createListItem({
        id: st.code,
        label: st.name,
        badgeText: Array.isArray(st.cities) ? `${st.cities.length} cities` : 'no cities',
        selected: state.selectedState && state.selectedState.code === st.code,
        onClick: () => {
          state.selectedState = st;
          resetLowerLevels('state');
          state.filteredCities = Array.isArray(st.cities) ? st.cities : [];
          renderAll();
        },
      });
      stateList.appendChild(item);
    });
  }

  function renderCities() {
    clearElementChildren(cityList);
    const cities = state.countryOnly ? [] : (state.selectedState ? state.filteredCities : []);

    cities.forEach((city) => {
      const item = createListItem({
        id: city,
        label: city,
        selected: state.selectedCity === city,
        onClick: () => {
          state.selectedCity = city;
          renderAll();
        },
      });
      cityList.appendChild(item);
    });
  }

  function applyFilters() {
    const cQuery = normalize(continentSearch.value);
    state.filteredContinents = WORLD_DATA.filter((ct) => normalize(ct.name).includes(cQuery));

    if (state.selectedContinent) {
      const coQuery = normalize(countrySearch.value);
      state.filteredCountries = state.selectedContinent.countries.filter((co) => normalize(co.name).includes(coQuery));
    }

    if (!state.countryOnly && state.selectedCountry) {
      const sQuery = normalize(stateSearch.value);
      state.filteredStates = (state.selectedCountry.states || []).filter((st) => normalize(st.name).includes(sQuery));
    }

    if (!state.countryOnly && state.selectedState) {
      const cityQuery = normalize(citySearch.value);
      state.filteredCities = (state.selectedState.cities || []).filter((city) => normalize(city).includes(cityQuery));
    }
  }

  function renderAll() {
    applyFilters();
    renderContinents();
    renderCountries();
    renderStates();
    renderCities();
    updateSummary();
  }

  // Event handlers
  continentSearch.addEventListener('input', renderAll);
  countrySearch.addEventListener('input', renderAll);
  stateSearch.addEventListener('input', renderAll);
  citySearch.addEventListener('input', renderAll);

  countryOnlyToggle.addEventListener('change', () => {
    state.countryOnly = countryOnlyToggle.checked;
    if (state.countryOnly) {
      // Clear state and city selections when toggled on
      state.selectedState = null;
      state.selectedCity = null;
      stateSearch.value = '';
      citySearch.value = '';
    }
    renderAll();
  });

  clearBtn.addEventListener('click', () => {
    continentSearch.value = '';
    countrySearch.value = '';
    stateSearch.value = '';
    citySearch.value = '';
    countryOnlyToggle.checked = false;

    state.countryOnly = false;
    state.selectedContinent = null;
    state.selectedCountry = null;
    state.selectedState = null;
    state.selectedCity = null;

    state.filteredContinents = WORLD_DATA;
    state.filteredCountries = [];
    state.filteredStates = [];
    state.filteredCities = [];

    renderAll();
  });

  confirmBtn.addEventListener('click', () => {
    // In a real app, you might send this to an API or persist it somewhere
    const output = selectionOutput.textContent;
    console.log('Confirmed selection:', output);
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Confirmed!';
    setTimeout(() => {
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Confirm Selection';
    }, 1200);
  });

  // Initialize
  renderAll();
})();