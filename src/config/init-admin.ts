import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsuarioService } from '../usuario/usuario.service';
import { v4 as uuid } from 'uuid';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usuarioService = app.get(UsuarioService);
  const configService = app.get(ConfigService);
  const hashearSenhaPipe = new HashearSenhaPipe(configService);

  const adminUser: UsuarioEntity = {
    id: '',
    nome: 'Admin',
    email: 'admin@example.com',
    senha: 'admin123',
    rg: '00.000.000-0',
    cpf: '000.000.000-00',
    rua: 'Admin Street',
    numero: 123,
    complemento: 'Apt 101',
    bairro: 'Admin District',
    cidade: 'Admin City',
    estado: 'SP',
    pais: 'Admin Country',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    reservas: [],
  };

  const usuarioEntity = {
    ...adminUser,
    id: uuid(),
    senha: await hashearSenhaPipe.transform(adminUser.senha),
  };

  await usuarioService.createUsuario(usuarioEntity);
  console.log('Admin user created');
  await app.close();
}

bootstrap();