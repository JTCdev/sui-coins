import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { SearchSVG, TimesSVG } from '@/svg';

import {
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenFilter from './select-token-modal-filter';

const SelectTokenModal: FC<SelectTokenModalProps> = ({
  simple,
  onSelect,
  closeModal,
}) => {
  const { isFetchingCoinBalances } = useWeb3();

  const { control, register, setValue } = useForm<SearchTokenForm>({
    defaultValues: {
      search: '',
      filter: TokenOrigin.Strict,
    },
  });

  const handleSelectToken = (coin: CoinObject) => {
    onSelect(coin);
    closeModal();
  };

  return (
    <Motion
      layout
      minWidth="22rem"
      display="flex"
      bg="onPrimary"
      maxHeight="90vh"
      maxWidth="25rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        p="m"
        display="grid"
        alignItems="center"
        justifyContent="space-between"
        gridTemplateColumns="2rem auto 2rem"
      >
        <Box />
        <Typography variant="title" size="large">
          Select Token
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box mx="xl" mt="l" display="flex" gap="3xs" flexDirection="column">
        <Box>
          <TextField
            fontSize="medium"
            placeholder="Sui"
            label="Search token"
            {...register('search')}
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
        </Box>
        {!simple && <SelectTokenFilter control={control} setValue={setValue} />}
      </Box>
      <Motion
        bg="#B6C4FF33"
        overflowY="auto"
        position="relative"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
      >
        <Box
          flex="1"
          display="flex"
          overflowY="auto"
          bg="lowContainer"
          flexDirection="column"
        >
          <SelectTokenModalBody
            control={control}
            loading={isFetchingCoinBalances}
            handleSelectToken={handleSelectToken}
          />
        </Box>
      </Motion>
    </Motion>
  );
};

export default SelectTokenModal;
