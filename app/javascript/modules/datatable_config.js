  const config = {
    parcelles: [
      { name: 'reference_cadastrale', data: '0' },
      { name: 'lieu_dit', data: '1' },
      { name: 'code_officiel_geographique', data: '2' },
      { name: 'surface', data: '3' },
      { name: 'annee_plantation', data: '4' },
      { name: 'distance_rang', data: '5' },
      { name: 'distance_pieds', data: '6' },
      { name: 'tag_id', data: '7' },
      { name: '', data: '8' }
    ],
    tags: [
      { name: 'name', data: '0' },
      { name: 'description', data: '1' },
      { name: 'color', data: '2' },
      { name: '', data: '3' },
    ],
    suppliers: [
      { name: 'name', data: '0' },
      { name: 'phone', data: '1' },
      { name: 'email', data: '2' },
      { name: '', data: '3' },
    ],
    offers: [
      { name: 'name', data: '0' },
      { name: 'unit', data: '1' },
      { name: 'price', data: '2' },
      { name: 'updated_at', data: '3' },
      { name: 'supplier_id', data: '4' },
      { name: '', data: '5' },
    ],
    invitations: [
      { name: 'name', data: '0' },
      { name: 'surname', data: '1' },
      { name: 'phone', data: '2' },
      { name: 'email', data: '3' },
      { name: 'created_at', data: '4' },
      { name: '', data: '5' },
    ]
  }

export { config }
