# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

p1 = ['Le Mont Mire', 0.2295, 'AE17', 1989, 51177]
p2 = ['Le Mont Mire', 0.0579, 'AE18', 1989, 51177 ]
p3 = ['Le Mont Moine', 0.0939, 'AH350', 1987, 51177 ]
p4 = ['Le Paradis', 0.1342, 'AD73', 1987, 51177 ]
p5 = ['Les Auches', 0.1234, 'AH81', 1983, 51177 ]
p6 = ['Les Gouttes d\'Or', 0.1789, 'AD267', 1989, 51177]
p7 = ['Les Marmanjons', 0.0491, 'AD229', 1986, 51177 ]
p8 = ['Les Marmanjons', 0.097, 'AD230', 1986, 51177 ]
p9 = ['Les Vignes Dieu', 0.1396, 'AE94', 1989, 51177 ]
p10 = ['Les Fontenelles', 0.1673, 'A194', 1988, 51291]

PARCELLES = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]

PARCELLES.each do |p|
  Parcelle.create(lieu_dit: p[0], surface: p[1], reference_cadastrale: p[2], annee_plantation: p[3], code_officiel_geographique: p[4])
end
