export type Delincuente = {
  id?: number;
  nombre: string | null;
  cedula: number | null;
  file: File | string;
  pasaporte: string | null;
  ruc: string | null;
  alias: string | null;
  otrosNombres: string | null;
  condicionCedulado: string | null;
  nacionalidad: string | null;
  fechaNacimiento: string | null;
  lugarNacimiento: string | null;
  edad: number | null;
  huellas: string | null;
  estadoCivil: string | null;
  nombreConyuge: string | null;
  profesion: string | null;
  domicilio: string | null;
  celular: string | null;
  celularFijo: string | null;
  nombrePadre: string | null;
  nombreMadre: string | null;
  antecedentesSiipe: string | null;
  licencia: string | null;
  vehiculos: string | null;
  movimientosMigratorios: string | null;
  impedimentoSalida: string | null;
};

export type CloudImage = {
  secure_url: string;
};
