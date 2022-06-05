const jobsData = [
  {
    id: 0,
    title: "Pessoa desenvolvedora front-end - React",
    enterprise: "Kenzie",
    location: "Curitiba",
    descrition:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    modalities: ["Hibrido", "Presencial"],
  },
  {
    id: 1,
    title: "Pessoa desenvolvedora back-end - Node JS",
    enterprise: "Brazilians in Tech",
    location: "Rio de Janeiro",
    descrition:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    modalities: ["Home Office", "Presencial"],
  },
];

let jobsSelect = [];
let $jobsCardsArea = document.querySelector(".jobs");
let $jobSelectedCardsArea = document.querySelector(".jobs-selected-render");

jobsData.map((job) => {
  $jobsCardsArea.insertAdjacentHTML(
    "beforeend",
    `
    <div class="jobs-card">
        <h4 class="title-4 color-grey-1">
        ${job.title}
        </h4>
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
        <a href="#vagasSelecionadas" class="button-little-default" onclick="selectJob(${
          job.id
        })">Candidatar</a>
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
              <h5 class="title-5 jobs-selected-card-title">
                ${e.title}
              </h5>
              <button class="button-icon" onclick="removeJob(${e.id})" 
                title="Desejar cancelar a candidatura para esta vaga? Se sim, clique aqui.">
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

const selectJob = (id) => {
  const analytics = jobsSelect.some((e) => e.id === Number(id));

  if (!analytics) {
    const newdata = jobsData.filter((job) => job.id === Number(id));
    jobsSelect.push(...newdata);
    analyticsItems();
    selectJobRender(newdata);
  }

  return jobsSelect;
};

const removeJob = (id) => {
  const newdata = jobsSelect.filter((job) => job.id !== Number(id));
  jobsSelect = [...newdata];
  document.querySelector(`#jobs-selected-card-${id}`).remove();

  analyticsItems();

  return jobsSelect;
};

const analyticsItems = () => {
  let $jobsSelectedNoItems = document.querySelector(".jobs-selected-no-items");

  if (jobsSelect.length === 0) {
    $jobSelectedCardsArea.insertAdjacentHTML(
      "beforebegin",
      `<div class="jobs-selected-no-items flex-column">
        <p>Você ainda não aplicou para nenhuma vaga</p>
        <img src="../../assets/img/no-items.svg" 
        alt="Imagem representando a ausência de vagas selecionadas" 
        title="Imagem representando a ausência de vagas selecionadas" />
      </div>`
    );
  } else {
    $jobsSelectedNoItems !== null && $jobsSelectedNoItems.remove();
  }
};

analyticsItems();
