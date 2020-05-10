const PERSON = ({name, role}) => `
<div class="card">
<div class="card-body">
    <h5 class="card-title"><img style="height:64px;width:60px;" class="m-2" src="/icons/person-selected.svg" alt="Person Node"> ${name}</h5>
    <p class="card-text">role: ${role}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
`

const OBJECT = ({reference, desc}) => `
<div class="card">
    <div class="card-body">
        <h5 class="card-title"><img style="height:64px;width:60px;" class="m-2" src="/icons/object-selected.svg" alt="Object Node"> ${reference}</h5>
        <p class="card-text">${desc}</p>
    </div>
</div>
`

const LOCATION = ({name, address}) => `
<div class="card">
    <div class="card-body">
        <h5 class="card-title"><img style="height:64px;width:60px;" class="m-2" src="/icons/location-selected.svg" alt="Location Node"> ${name}</h5>
        <p class="card-text">${address}</p>
    </div>
</div>
`

const EVENT = ({title, date}) => `
<div class="card">
    <div class="card-body">
        <h5 class="card-title"><img style="height:64px;width:60px;" class="m-2" src="/icons/event-selected.svg" alt="Event Node"> ${title}</h5>
        <p class="card-text">${date}</p>
    </div>
</div>
`

module.exports = {PERSON, OBJECT, LOCATION, EVENT}