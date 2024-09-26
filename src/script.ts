import { FormNinja } from "./modules/form-ninja";

// Expose FormNinja globally
(window as any).FormNinja = FormNinja; // Ensure you set it directly as a class

console.log("FormNinja is available globally:");
