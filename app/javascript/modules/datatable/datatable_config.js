const config = {
  parcelles: [
    { name: 'reference_cadastrale', data: '0'  },
    { name: 'lieu_dit', data: '1' },
    { name: 'code_officiel_geographique', data: '2' },
    { name: 'town', data: '3' },
    { name: 'surface', data: '4', footer: '<p data-total="surface"></p>'  },
    { name: 'annee_plantation', data: '5' },
    { name: 'distance_rang', data: '6' },
    { name: 'distance_pieds', data: '7' },
    { name: 'tag_id', data: '8' },
    { name: 'actions', data: '9' },
  ],
  tags: [
    { name: 'name', data: '0' },
    { name: 'description', data: '1' },
    { name: 'color', data: '2' },
    { name: 'actions', data: '3' },
  ],
  suppliers: [
    { name: 'name', data: '0', footer: '<p data-total="total"></p>' },
    { name: 'phone', data: '1' },
    { name: 'email', data: '2' },
    { name: 'actions', data: '3' },
  ],
  offers: [
    { name: 'name', data: '0', footer: '<p data-total="total"></p>' },
    { name: 'unit', data: '1' },
    { name: 'price', data: '2' },
    { name: 'updated_at', data: '3' },
    { name: 'supplier_id', data: '4' },
    { name: 'actions', data: '5' },
  ],
  invitations: [
    { name: 'name', data: '0', footer: '<p data-total="total"></p>' },
    { name: 'surname', data: '1' },
    { name: 'phone', data: '2' },
    { name: 'email', data: '3' },
    { name: 'created_at', data: '4' },
    { name: 'actions', data: '5' },
  ],
  contracts: [
    { name: 'name', data: '0', footer: '<p data-total="total"></p>' },
    { name: 'start_date', data: '1'},
    { name: 'end_date', data: '2' },
    { name: 'holder', data: '3' },
    { name: 'type', data: '4' },
    { name: 'unit_price', data: '5' },
    { name: 'unit', data: '6' },
    { name: 'actions', data: '7' },
  ]
}

export { config }
