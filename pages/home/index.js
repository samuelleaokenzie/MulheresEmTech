let jobsSelect = [];
let $jobsCardsArea = document.querySelector(".jobs");
let $jobSelectedCardsArea = document.querySelector(".jobs-selected-render");

jobsData.map((job) => {
  $jobsCardsArea.insertAdjacentHTML(
    "beforeend",
    `
    <div class="jobs-card">
        <h3 class="title-4 color-grey-1">
        ${job.title}
        </h3>
        <div class="jobs-card-details flex-row">
            <span class="text-3 color-grey-2">${job.enterprise}</span>
            <span class="text-3 color-grey-2">${job.location}</span>
        </div>
        <p class="text-2 color-grey-2">${job.descrition}</p>
        <div class="jobs-card-footer">
      
        <div>
        ${job.modalities
          .map(
            (modality) =>
              `<span class="jobs-card-modality text-3">${modality}</span>`
          )
          .join("")}
        </div>
        <a href="#vagasSelecionadas" class="button-little-default bt-select-job" id="jobs-card-${
          job.id
        }" onclick="selectJob(this, ${job.id})">Candidatar</a>
        </div>
    </div>
    `
  );
});

const selectJobRender = (data) => {
  data
    .map((e) =>
      $jobSelectedCardsArea.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="jobs-selected-card" id="jobs-selected-card-${e.id}">
            <div class="jobs-selected-card-header">
              <h3 class="title-5 jobs-selected-card-title">
                ${e.title}
              </h3>
              <button type="button" class="button-icon" data-id="${e.id}" onclick="removeJob(${e.id})" 
                aria-label="Desejar cancelar a candidatura para esta vaga? Se sim, clique aqui.">
                <img src="../../assets/img/trash.svg" alt="Ícone Simbolizando uma lixeira" />
              </button>
            </div>
            <div class="jobs-selected-card-details flex-row">
              <span class="text-3 color-grey-2">${e.enterprise}</span>
              <span class="text-3 color-grey-2">${e.location}</span>
            </div>
        </div>
        
        `
      )
    )
    .join("");
};

const selectJob = (event = HTMLElement, id) => {
  const analytics = jobsSelect.some((e) => e.id === Number(id));

  if (!analytics) {
    const newdata = jobsData.filter((job) => job.id === Number(id));
    jobsSelect.push(...newdata);
    window.localStorage.setItem("data-jobs", JSON.stringify(jobsSelect))
    selectJobRender(newdata);
    event.innerText = "Remover candidatura";
    analyticsItems();
  }else{
    removeJob(id);
    event.innerText = "Candidatar";
  }

  return jobsSelect;
};

const removeJob = (id) => {
  const newdata = jobsSelect.filter((job) => job.id !== Number(id));
  jobsSelect = [...newdata];
  window.localStorage.setItem("data-jobs", JSON.stringify(jobsSelect))
  const $buttonRemove = document.querySelector(`#jobs-selected-card-${id}`);
  $buttonRemove !== null && $buttonRemove.remove();
  const $buttonToggle = document.querySelector(`#jobs-card-${id}`)
  $buttonToggle.innerText = "Candidatar"
  analyticsItems();

  return jobsSelect;
};

let selectJobLocalStorage = JSON.parse(window.localStorage.getItem("data-jobs"))

const analyticsItems = () => {
  let $jobsSelectedNoItems = document.querySelector(".jobs-selected-no-items");
  let $jobsSelectedItem = document.querySelector(".jobs-selected-card");

  if ($jobsSelectedItem == null) {
    $jobSelectedCardsArea.insertAdjacentHTML(
      "beforebegin",
      `<div class="jobs-selected-no-items flex-column">
        <p class="text-2">Você ainda não aplicou para nenhuma vaga</p>
        <img src="/assets/img/no-items.svg" 
        alt="Imagem representando a ausência de vagas selecionadas" 
        title="Imagem representando a ausência de vagas selecionadas" />
      </div>`
    );
  } else {
    $jobsSelectedNoItems !== null && $jobsSelectedNoItems.remove();
  }
};

if(selectJobLocalStorage.length > 0){  
  let idJobsSelected = selectJobLocalStorage.map((element)=>{
      return element.id
  })

  idJobsSelected.forEach((element)=>{
   selectJob(document.getElementById(`jobs-card-${element}`), element)
  })
}

analyticsItems()


