import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContratosComponent } from './views/contratos/contratos.component';
import { DatosGeneralesComponent } from './views/datosGenerales/datosGenerales.component';
import { GarantiasComponent } from './views/garantias/garantias.component';
import { ActasComponent } from './views/actas/actas.component';
import { EntregablesComponent } from './views/entregables/entregables.component';
import { InformesComponent } from './views/informes/informes.component';
import { ModificacionesComponent } from './views/modificaciones/modificaciones.component';
import { MultasComponent } from './views/multas/multas.component';
import { PagosComponent } from './views/pagos/pagos.component';
import { SolicitudComponent } from './views/solicitud/solicitud.component';
import { VencimientosComponent } from './views/vencimientos/vencimientos.component';
import { ConsultaComponent } from './views/consultaGenerica/consulta.component';
import { HistorialComponent } from './views/historial/historial.component';
import { CatalogoComponent } from './catalogo/catalogo/catalogo.component';
import { TipoCategoriaComponent } from './catalogo/tipoCategoria/tipo-categoria.component';
import { UsuarioComponent } from './catalogo/usuario/usuario.component';
import { RolComponent } from './catalogo/rol/rol.component';
import { NuevoContratoComponent } from './views/nuevo-contrato/nuevo-contrato.component';
import { ParentComponent } from './parent/parent.component';

export const routes: Routes = [
    {
      path: '', component: ParentComponent,
      children: [
        { path: '', component: HomeComponent},
        { path: 'contratos', component: ContratosComponent },
        { path: 'DatosGenerales', component: DatosGeneralesComponent },
        { path: 'Garantia', component: GarantiasComponent },
        { path: 'Acta', component: ActasComponent },
        { path: 'Entregables', component: EntregablesComponent },
        { path: 'Informes', component: InformesComponent },
        { path: 'Modificacion', component: ModificacionesComponent },
        { path: 'Multa', component: MultasComponent },
        { path: 'formaPago', component: PagosComponent },
        { path: 'Solicitud', component: SolicitudComponent },
        { path: 'Vencimientos', component: VencimientosComponent },
        { path: 'Consulta', component: ConsultaComponent },
        { path: 'Historial', component: HistorialComponent },
        { path: 'Configuracion', component: CatalogoComponent },
        { path: 'tipos-categoria', component: TipoCategoriaComponent },
        { path: 'usuarios', component: UsuarioComponent },
        { path: 'Tipos', component: TipoCategoriaComponent },
        { path: 'roles', component: RolComponent },
        { path: 'registrar-contrato', component: NuevoContratoComponent }
      ]
    }
];
