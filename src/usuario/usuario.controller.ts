import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUsuarioDTO } from "./dto/CreateUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid} from 'uuid'
import { ShowUsuarioDTO } from "./dto/ShowUsuario.dto";
import { UpdateUsuarioDTO } from "./dto/UpdateUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { HashearSenhaPipe } from "../recursos/pipes/hashear-senha.pipe";
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';
import { UserEmail } from "src/decorators/user.decorator";

@UseGuards(AutenticacaoGuard)
@ApiTags('usuario')
@Controller('/usuario')
export class UsuarioController{

    constructor(
        private usuarioService: UsuarioService
    ) {}

    @ApiOperation({summary:'Cria um novo usuario'})
    @ApiCreatedResponse({description:'Retorna o usuario criado', type: ShowUsuarioDTO})
    @ApiUnprocessableEntityResponse({description:'Erro de validação'})
    @Post()
    async createUsuario(
        @Body() {senha, ...dadosUsuario}:CreateUsuarioDTO,
        @Body('senha', HashearSenhaPipe) senhaHasheada:string 
)   {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.id=uuid();
        usuarioEntity.nome=dadosUsuario.nome;
        usuarioEntity.email=dadosUsuario.email;
        usuarioEntity.senha=senhaHasheada;
        usuarioEntity.cpf=dadosUsuario.cpf;
        usuarioEntity.rg=dadosUsuario.rg;
        usuarioEntity.rua=dadosUsuario.rua;
        usuarioEntity.numero=dadosUsuario.numero;
        usuarioEntity.complemento=dadosUsuario.complemento;
        usuarioEntity.bairro=dadosUsuario.bairro;
        usuarioEntity.cidade=dadosUsuario.cidade;
        usuarioEntity.estado=dadosUsuario.estado;
        usuarioEntity.pais=dadosUsuario.pais;
        usuarioEntity.role=dadosUsuario.role;

        this.usuarioService.createUsuario(usuarioEntity);
        return {
            usuario: new ShowUsuarioDTO(usuarioEntity.id, usuarioEntity.nome,usuarioEntity.email,usuarioEntity.rg,usuarioEntity.cpf,usuarioEntity.role),
            message:'usuario criado com sucesso!'
        }
    }

    // Adicione uma rota para buscar o usuario pelo token de acesso
    @Get('/me')
    async getMe(@UserEmail() email: string){
        const usuario = await this.usuarioService.buscaPorEmail(email);
        return { user: usuario };
    }

    @ApiOperation({summary:'Lista todos os usuarios'})
    @Get()
    async readUsuario(){
        const usuariosSalvos=await this.usuarioService.readUsuario();        
        return usuariosSalvos;
    }

    @ApiOperation({summary:'Atualiza um usuario'})
    @Put('/:id')
    async updateUsuario(@Param('id') id:string, @Body() dadosUsuario:UpdateUsuarioDTO)
    {
        const usuarioAtualizado=await this.usuarioService.updateUsuario(id, dadosUsuario);

        return {
            usuario: usuarioAtualizado,
            message:'usuario atualizado com sucesso!'
        }
    }

    @ApiOperation({summary:'Deleta um usuario'})
    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string)
    {
        const usuarioDeleted = await this.usuarioService.deleteUsuario(id);

        return{
            usuario: usuarioDeleted,
            message:'usuario removido com sucesso!'
        }
    }
}