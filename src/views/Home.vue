<template>
  <VContainer grid-list-md box>
    <VLayout wrap>
      <VFlex xs12 text-xs-center display-2 font-weight-light>
        Cadastro de Alunos
      </VFlex>
      <VFlex xs12>
        <VForm ref="form" v-model="isFormValid">
          <VLayout wrap>
            <VFlex xs12 headline font-weight-light>
              dados pessoais
              <VDivider />
            </VFlex>

            <VFlex xs12 md4>
              <VTextField
                v-model="student.name.firstName"
                label="primeiro nome"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md4>
              <VTextField
                v-model="student.name.middleName"
                label="nome do meio"
              />
            </VFlex>
            <VFlex xs12 md4>
              <VTextField
                v-model="student.name.lastName"
                label="sobrenome"
                :rules="[required]"
              />
            </VFlex>

            <VFlex xs12 md4>
              <VSelect
                v-model="student.demographics.gender"
                :items="genders"
                :rules="[required]"
                item-value="code"
                label="gênero"
              >
                <template slot="item" slot-scope="data">
                  <VListTileContent>
                    {{ data.item.label }}
                  </VListTileContent>
                </template>
                <template slot="selection" slot-scope="data">
                  <VListTileContent>
                    {{ data.item.label }}
                  </VListTileContent>
                </template>
              </VSelect>
            </VFlex>
            <VFlex xs12 md4>
              <VTextField
                v-model="student.demographics.birthDate"
                label="data de nascimento"
                type="date"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md4>
              <VTextField
                v-model="student.demographics.projectedGraduationYear"
                label="previsão para conclusão do curso"
                mask="####"
                :rules="[required]"
              />
            </VFlex>

            <VFlex xs12 headline font-weight-light>
              endereço
              <VDivider />
            </VFlex>

            <VFlex xs12 md2>
              <VTextField
                v-model="address.cep"
                label="cep"
                mask="#####-###"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md5>
              <VTextField
                v-model="address.street"
                label="logradouro"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md2>
              <VTextField
                v-model="address.number"
                label="número"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md3>
              <VTextField v-model="address.complement" label="complemento" />
            </VFlex>

            <VFlex xs12 md5>
              <VTextField
                v-model="address.neighborhood"
                label="bairro"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md5>
              <VTextField
                v-model="address.city"
                label="cidade"
                :rules="[required]"
              />
            </VFlex>
            <VFlex xs12 md2>
              <VTextField
                v-model="address.state"
                label="estado"
                mask="AA"
                :rules="[required]"
              />
            </VFlex>
          </VLayout>
        </VForm>
      </VFlex>
      <VFlex xs12>
        <VBtn
          color="success"
          block
          :loading="loading"
          :disabled="!isFormValid"
          @click="saveStudent()"
          >cadastrar</VBtn
        >
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      address: {
        city: undefined,
        complement: undefined,
        neighborhood: undefined,
        number: undefined,
        postalCode: undefined,
        state: undefined,
        street: undefined
      },
      genders: [
        {
          code: "M",
          label: "masculino"
        },
        {
          code: "F",
          label: "feminino"
        },
        {
          code: "O",
          label: "outros"
        }
      ],
      isFormValid: false,
      loading: false,
      required: value => !!value || "campo obrigatório",
      student: {
        addresses: [],
        alerts: [],
        demographics: {
          birthDate: undefined,
          gender: undefined,
          projectedGraduationYear: undefined
        },
        name: {
          firstName: undefined,
          lastName: undefined,
          middleName: undefined
        },
        schoolSubjects: [],
        studentUsername: undefined
      }
    };
  },
  methods: {
    saveStudent() {
      this.loading = true;
      this.student.addresses.push(this.address);

      axios
        .post("https://school-mongo-api.herokuapp.com/student", this.student)
        .then(() => {
          this.$refs.form.reset();
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    }
  }
};
</script>

<style>
.container.box {
  max-width: 1150px !important;
}
</style>
