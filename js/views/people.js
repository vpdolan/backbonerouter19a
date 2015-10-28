function processData(data) {
  return data.map(function(item){
    return `
      <li class="person-list-item" data-person-id="${item.objectId}">
        <span>${item.Name}</span>
      </li>
    `;
  }).join('');
}

export default function(data) {
  return `
    <div class="people-list">
      <h1>People</h1>
      <ul>${processData(data)}</ul>
    </div>
  `;
}