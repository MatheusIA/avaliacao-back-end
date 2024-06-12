// import { Controller, Get } from "@nestjs/common";
// import { SecondaryDatabaseService } from "@/secondary-database.service";

// @Controller("superheroes")
// export class SuperHeroController {
//   constructor(
//     private readonly secondaryDatabaseService: SecondaryDatabaseService,
//   ) {}

//   @Get()
//   async getSuperHeroes(): Promise<any[]> {
//     const query = `
//       SELECT
//         s.id,
//         s.superhero_name,
//         p.publisher_name,
//         SUM(ha.attribute_value) AS total_attributes
//       FROM
//         superhero.superhero s
//         INNER JOIN superhero.publisher p ON s.publisher_id = p.id
//         LEFT JOIN superhero.hero_attribute ha ON s.id = ha.hero_id
//         LEFT JOIN superhero.attribute a ON ha.attribute_id = a.id
//       GROUP BY
//         s.id,
//         s.superhero_name,
//         p.publisher_name
//       ORDER BY
//         SUM(ha.attribute_value) DESC
//     `;
//     return await this.secondaryDatabaseService.executeQuery(query);
//   }
// }
