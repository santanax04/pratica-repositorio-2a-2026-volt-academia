import { Image, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FOTOS_EXERCICIOS } from '@/data/fotos-exercicios';
import { exercicioPorId } from '@/data/exercicios';
import { cores } from '@/constants/tema';

/**
 * Imagem do exercício: a FOTO real (assets/exercicios/<id>.jpg) quando existir;
 * senão uma capa discreta com o ícone e o grupo muscular (sem bonecos).
 * `animar` é aceito só por compatibilidade com quem já chama este componente.
 */
export function FiguraExercicio({ id, icone = 'dumbbell', tamanho = 56 }) {
  const foto = FOTOS_EXERCICIOS[id];
  const ex = exercicioPorId(id);

  const moldura = {
    width: tamanho,
    height: tamanho,
    borderRadius: tamanho * 0.28,
    overflow: 'hidden',
    backgroundColor: '#0F0F11',
    borderWidth: 1,
    borderColor: 'rgba(198,255,61,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (foto) {
    return (
      <View style={moldura}>
        <Image source={foto} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>
    );
  }

  const grande = tamanho >= 110;
  return (
    <View style={moldura}>
      <Svg width={tamanho} height={tamanho} style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="brilho" cx="78%" cy="20%" r="85%">
            <Stop offset="0" stopColor={cores.lima} stopOpacity="0.28" />
            <Stop offset="1" stopColor="#0F0F11" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width={tamanho} height={tamanho} fill="url(#brilho)" />
      </Svg>
      <MaterialCommunityIcons name={ex?.icone || icone} size={tamanho * 0.46} color={cores.lima} />
      {grande && !!ex && (
        <Text
          style={{
            position: 'absolute', left: 14, bottom: 12, color: cores.texto2, fontSize: 11,
            fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase',
          }}
        >
          {ex.grupo}
        </Text>
      )}
    </View>
  );
}
